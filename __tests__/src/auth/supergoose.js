'use strict';

const { server } = require('../../../src/app');
const supergoose = require('../../supergoose');

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

const mockRequest = supergoose.server(server);

const Role = require('../../../src/auth/roles-model');
const User = require('../../../src/auth/users-model');


var users = {
  user: new User({ username: 'Link', password: 'Triforce', role: 'user' }),
  editor: new User({ username: 'Diablo', password: 'Destruction', role: 'editor' }),
  admin: new User({ username: 'Sunshine', password: 'Rainbows', role: 'admin' }),
};

var roles = [
  { role: 'user', capabilities: ['read'] },
  { role: 'editor', capabilities: ['create','read','update'] },
  { role: 'admin', capabilities: ['create','read','update','delete','system'] },
];

let editorToken = users.editor.generateToken();

console.log(`TOKEN ${editorToken}`);

beforeAll(async () => {
  await Promise.all(Object.values(users).map(user => user.save()));
  await Promise.all(roles.map(role => new Role(role).save()));
});

describe('api route auth', () => {
  it('recieves a 401 if not authenticated', () => {
    return mockRequest
      .get('/categories')
      .expect(401);
  });

  it('recieves 401 unauthorized if user doest not have proper authorization level', () => {
    return mockRequest
      .post('/categories')
      .set('Authorization', `Bearer ${users.user.generateToken()}`)
      .expect(401);
  });

}); 

