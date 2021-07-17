const {Pool}=require('pg');

const pool=new Pool({
    host:'localhost',
    user:'postgres',
    password: 'Astro10-',
    database: 'Bases_1',
    port:'5432'

});

module.exports=pool;