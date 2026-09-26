import ExcelJS from 'exceljs';
import {PDFDocument,StandardFonts,rgb,type PDFPage,type PDFFont} from 'pdf-lib';
import {type CashReport,METHODS} from './cash';
import {monthLabel,rupiah} from './dues';
export async function cashExcel(report:CashReport){
 const book=new ExcelJS.Workbook();book.creator='PW Persis Kepri';book.created=new Date();
 const sheet=book.addWorksheet('Buku kas',{pageSetup:{paperSize:9,orientation:'landscape',fitToPage:true}});
 sheet.addRow(['BUKU KAS PW PERSIS KEPRI']);sheet.addRow(['Bulan',monthLabel(`${report.month}-01`)]);
 sheet.addRow(['Tanggal mulai pembukuan',report.settings?.start_date]);sheet.addRow(['Saldo awal bulan',report.opening]);sheet.addRow(['Pemasukan',report.income]);sheet.addRow(['Pengeluaran',report.expense]);sheet.addRow(['Saldo akhir bulan',report.closing]);
 sheet.addRow(['Laporan sesuai status saat diunduh. Iuran menggunakan tanggal pembayaran terverifikasi.']);sheet.addRow([]);
 const headers=['Tanggal','Referensi','Pemberi / penerima','Kategori','Kegiatan','Uraian','Metode','Masuk (Rp)','Keluar (Rp)','Saldo (Rp)'];
 sheet.addRow(headers);
 for(const r of report.rows)sheet.addRow([r.transacted_on,`${r.source==='dues'?'IUR':'KAS'}-${r.id}`,r.party,r.category,r.activity,r.description,METHODS[r.method],r.kind==='income'?r.amount:0,r.kind==='expense'?r.amount:0,r.balance]);
 sheet.columns.forEach((c,i)=>{c.width=[14,42,26,22,28,55,14,22,22,22][i];});
 for(let i=4;i<=7;i++)sheet.getCell(`B${i}`).numFmt='#,##0';
 for(const col of ['H','I','J'])sheet.getColumn(col).numFmt='#,##0';
 sheet.getRow(1).font={bold:true,size:16};sheet.getRow(10).font={bold:true,color:{argb:'FFFFFFFF'}};
 sheet.getRow(10).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF065F46'}};
 sheet.eachRow(row=>{row.alignment={vertical:'top',wrapText:true};});
 sheet.views=[{state:'frozen',ySplit:10}];sheet.autoFilter={from:'A10',to:`J${Math.max(10,sheet.rowCount)}`};
 const voids=book.addWorksheet('Pembatalan');voids.addRow(['TRANSAKSI DIBATALKAN — TIDAK MASUK SALDO']);voids.addRow(['Tanggal','ID','Jenis','Pihak','Nominal (Rp)','Uraian','Alasan','Waktu pembatalan']);
 for(const r of report.voided)voids.addRow([r.transacted_on,r.id,r.kind==='income'?'Pemasukan':'Pengeluaran',r.party,r.amount,r.description,r.void_reason,r.voided_at]);
 voids.columns.forEach((c,i)=>{c.width=[15,42,18,28,22,55,55,30][i];});voids.getColumn(5).numFmt='#,##0';voids.getRow(2).font={bold:true};voids.eachRow(r=>{r.alignment={wrapText:true,vertical:'top'};});
 return new Uint8Array(await book.xlsx.writeBuffer());
}
// Standard PDF fonts cover Indonesian/Latin text. Replace unsupported glyphs rather than failing the download.
function printable(value:string,font:PDFFont){return Array.from(value.normalize('NFC')).map(c=>{if(c==='\n'||c==='\r'||c==='\t')return ' ';try{font.encodeText(c);return c;}catch{return '?';}}).join('');}
function wrap(value:string,width:number,font:PDFFont,size:number){
 const lines:string[]=[];let line='';
 for(const word of printable(value,font).split(/\s+/)){
  if(font.widthOfTextAtSize(`${line}${line?' ':''}${word}`,size)<=width){line+=`${line?' ':''}${word}`;continue;}
  if(line){lines.push(line);line='';}
  for(const c of word){if(font.widthOfTextAtSize(line+c,size)>width){lines.push(line);line='';}line+=c;}
 }
 if(line||!lines.length)lines.push(line);return lines;
}
export async function cashPdf(report:CashReport){
 const doc=await PDFDocument.create(),font=await doc.embedFont(StandardFonts.Helvetica),bold=await doc.embedFont(StandardFonts.HelveticaBold);
 const green=rgb(.02,.31,.23),gray=rgb(.35,.4,.43);let page!:PDFPage;let y=0;
 const addPage=()=>{page=doc.addPage([842,595]);y=550;page.drawText('PW PERSIS KEPRI | BUKU KAS',{x:35,y,size:15,font:bold,color:green});y-=24;page.drawText(monthLabel(`${report.month}-01`),{x:35,y,size:11,font});y-=25;};
 const text=(value:string,size=9,color=gray)=>{for(const line of wrap(value,770,font,size)){if(y<45)addPage();page.drawText(line,{x:35,y,size,font,color});y-=size+5;}};
 addPage();text(`Awal bulan: ${rupiah(report.opening)}   |   Pemasukan: ${rupiah(report.income)}   |   Pengeluaran: ${rupiah(report.expense)}   |   Akhir bulan: ${rupiah(report.closing)}`,11,green);
 text(`Pembukuan mulai ${report.settings?.start_date}. Iuran dihitung menurut tanggal pembayaran yang sudah diverifikasi.`);
 text(`Diunduh ${new Date().toLocaleString('id-ID',{timeZone:'Asia/Jakarta'})} WIB. Laporan mengikuti status saat diunduh; bukan periode yang dikunci.`);y-=6;
 const xs=[35,112,447,557,667],widths=[70,328,103,103,135],head=['Tanggal / ref.','Pihak, uraian, kategori & kegiatan','Masuk (Rp)','Keluar (Rp)','Saldo (Rp)'];
 const tableHead=()=>{page.drawRectangle({x:30,y:y-8,width:782,height:23,color:rgb(.91,.96,.94)});head.forEach((h,i)=>page.drawText(h,{x:xs[i],y,size:9,font:bold,color:green}));y-=26;};
 tableHead();
 if(!report.rows.length)text('Belum ada transaksi aktif pada bulan ini.');
 for(const r of report.rows){
  const cells=[`${r.transacted_on} ${r.source==='dues'?'IUR':'KAS'}-${r.id.slice(0,8)}`,`${r.party} — ${r.description} | ${r.category} | ${METHODS[r.method]}${r.activity?` | ${r.activity}`:''}`,r.kind==='income'?String(r.amount.toLocaleString('id-ID')):'-',r.kind==='expense'?String(r.amount.toLocaleString('id-ID')):'-',r.balance.toLocaleString('id-ID')];
  const lines=cells.map((c,i)=>wrap(c,widths[i]-6,font,9));const height=Math.max(...lines.map(l=>l.length))*12+12;
  if(y-height<40){addPage();tableHead();}
  lines.forEach((ls,i)=>ls.forEach((l,j)=>page.drawText(l,{x:xs[i],y:y-j*12,size:9,font,color:gray})));
  y-=height;page.drawLine({start:{x:35,y:y+12},end:{x:807,y:y+12},thickness:.4,color:rgb(.85,.87,.88)});
 }
 if(report.voided.length){y-=15;text('PEMBATALAN — TIDAK MASUK SALDO',11,green);for(const r of report.voided){text(`${r.transacted_on} | KAS-${r.id.slice(0,8)} | ${r.party} | ${rupiah(r.amount)} | ${r.description}`);text(`Alasan: ${r.void_reason}`);y-=6;}}
 const pages=doc.getPages();pages.forEach((p,i)=>p.drawText(`Halaman ${i+1} / ${pages.length}  |  Dokumen internal PW Persis Kepri`,{x:35,y:20,size:8,font,color:gray}));
 return doc.save();
}
