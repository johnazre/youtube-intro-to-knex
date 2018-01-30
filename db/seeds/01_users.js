exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, name: 'Some Guy', email: 'test1@test.com'},
        { id: 2, name: 'Some Girl', email: 'test2@test.com'},
        { id: 3, name: 'Somone Else', email: 'test3@test.com'},
      ]);
    });
};
