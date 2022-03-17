const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// pool.query(`
// SELECT id, name, cohort_id
// FROM students
// LIMIT 5;
// `)
// .then(res => {
//   console.log(res.rows);
// })
// .catch(err => console.error('query error', err.stack));

// pool.query(`
// SELECT students.id as student_id, students.name as name, cohorts.name as cohort
// FROM students
// JOIN cohorts ON cohort_id = cohorts.id
// LIMIT 5;
// `)
//   .then(res => {
//     res.rows.forEach(user => {
//       console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
//     });
//   });

// pool.query(`
// SELECT students.id as student_id, students.name as name, cohorts.name as cohort
// FROM students
// JOIN cohorts ON cohort_id = cohorts.id
// LIMIT 5;
// `)
//   .then(res => {
//     res.rows.forEach(user => {
//       console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
//     });
//   });


// Query Parameters
// Let's make our application a little bit more dynamic. We will allow a user to specify a cohort name and
// the limit. So someone should be able to run the application with the following command:

// node students.js FEB 2

// Where FEB is the cohort name and 2 is the maximum number of results, and the results would be:

// pool.query(`
// SELECT students.id as student_id, students.name as name, cohorts.name as cohort
// FROM students
// JOIN cohorts ON cohorts.id = cohort_id
// WHERE cohorts.name LIKE '%${process.argv[2]}%'
// LIMIT ${process.argv[3]};
// `)
// .then(res => {
//   res.rows.forEach(user => {
//     console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
//   })
// });

// Stephanie Wolff has an id of 2 and was in the FEB12 cohort
// Stan Miller has an id of 3 and was in the FEB12 cohort

// // Update students.js and teachers.js to use parameterized queries.

const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
`;

const cohortName = process.argv[2];
const limit = process.argv[3];
// Store all potentially malicious values in an array.
const values = [`%${process.argv[2]}%`, limit];

pool.query(queryString, values)
  .then(res => {
    // console.log(res.rows);
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    });
  });


  // console.log(res.rows); from the above returned promise... getting the key names from the queryString variable
  // [
  //   { student_id: 2, name: 'Stephanie Wolff', cohort: 'FEB12' },
  //   { student_id: 3, name: 'Stan Miller', cohort: 'FEB12' }
  // ]

// Stephanie Wolff has an id of 2 and was in the FEB12 cohort
// Stan Miller has an id of 3 and was in the FEB12 cohort