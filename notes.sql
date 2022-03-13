-- Get the student's name, student's start_date, cohort's name, and cohort's start_date.
-- Alias the column names to be more descriptive.
-- Order by the start date of the cohort.
--wk5d1 Joining Tables, last Question (Toggle for answer):
SELECT students.name as student_name,
cohorts.name as cohort_name,
cohorts.start_date as cohort_start_date,
students.start_date as student_start_date
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE students.start_date < cohorts.start_date
ORDER BY cohorts.start_date;


-- INNER JOIN
-- If the foreign key is NULL, the row will not be included in the result of an INNER JOIN.
SELECT students.name as student_name, email, cohorts.name as cohort_name
FROM students INNER JOIN cohorts ON cohorts.id = cohort_id;
-- we could rewrite the query to include the INNER keyword.
FROM students JOIN cohorts ON cohorts.id = cohort_id

1. FROM students LEFT OUTER JOIN cohorts ON cohorts.id = cohort_id;
-- The first query will return all students because students is to the LEFT of the word JOIN.
-- The LEFT OUTER JOIN will return all of the students, even ones without a cohort_id.

2. FROM students RIGHT OUTER JOIN cohorts ON cohorts.id = cohort_id;
The second query will return all of the cohorts because cohorts is to the RIGHT of the word JOIN.
-- The RIGHT OUTER JOIN will return all cohorts, even ones without any students enrolled.

3. FROM students FULL OUTER JOIN cohorts ON cohorts.id = cohort_id;
The third query will return all rows from both tables, even when there is no match.
-- The FULL OUTER JOIN will return all cohorts and all students, even when there is no match.

-- We could also rewrite any RIGHT JOIN as a LEFT JOIN by changing the order of the tables.
-- So the following two queries would produce identical results:
1. FROM students LEFT JOIN cohorts ON cohorts.id = cohort_id;
2. FROM cohorts RIGHT JOIN students ON cohorts.id = cohort_id;




-- we want to select data from the students table and the cohorts table JOINed together.
-- If these two tables are JOINed together, we can select columns from either table.

-- However, we having a naming conflict because the column name is the same in both tables.
-- So we have to specify which table we want to select name from.

SELECT students.name, email, cohorts.name
FROM students JOIN cohorts;

-- And to make our results look a little bit nicer, we can alias the names.

SELECT students.name as student_name, email, cohorts.name as cohort_name
FROM students JOIN cohorts;

-- the database doesn't know that we want to JOIN the tables using these columns.
-- Every JOIN must also have an ON.

SELECT students.name as student_name, email, cohorts.name as cohort_name
FROM students JOIN cohorts ON cohort_id = cohorts.id;