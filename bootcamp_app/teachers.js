// Name of Teachers That Assisted
// In the "BootcampX Queries 4" assignment, we wrote a query to find the name of all the teachers that
// made an assistance request during a certain cohort.

// Instruction
// Run this query using node-postgres.

// Create a new file named teachers.js.
// Copy the database connection code from students.js.

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// Use the query from "BootcampX Queries 4" to get all teachers that made an assistance request during a cohort.
// Accept the cohort name as input from the user.
// Example:

// $ node teachers.js JUL02
// connected
// JUL02: Cheyanne Powlowski
// JUL02: Georgiana Fahey
// JUL02: Helmer Rodriguez
// JUL02: Jadyn Bosco
// JUL02: Roberto Towne
// JUL02: Rosalyn Raynor
// JUL02: Talon Gottlieb
// JUL02: Waylon Boehm

// SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
// FROM teachers
// JOIN assistance_requests ON teacher_id = teachers.id
// JOIN students ON student_id = students.id
// JOIN cohorts ON cohort_id = cohorts.id
// WHERE cohorts.name = 'JUL02'
// ORDER BY teacher;

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = '${process.argv[2]}'
ORDER BY teacher;
`)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.cohort}: ${user.teacher}`);
    });
  });


