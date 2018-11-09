import Models from '../../app/Models';
import User from '../../app/Models/User';

beforeEach(async () => {});

describe('Model', () => {
  it('has User model', () => {
    expect(Models.user).toEqual(User);
  });
});
