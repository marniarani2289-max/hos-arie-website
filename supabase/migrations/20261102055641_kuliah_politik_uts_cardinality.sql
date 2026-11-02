alter table public.kuliah_politik_uts add constraint kuliah_politik_uts_exactly_five check(cardinality(answers)=5);
