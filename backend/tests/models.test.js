const Device = require('../models/device.model');
const User = require('../models/user.model');
const Key = require('../models/key.model');
const Manufacturer = require('../models/manufacturer.model');

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require('./common');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('Device Model', () => {
  describe('GET devices', () => {
    it('should return devices with default parameters', async () => {
      const devices = await Device.get();
      expect(devices).toBeInstanceOf(Array);
      expect(devices.length).toBeLessThanOrEqual(100)
    });

    it('should return devices with custom limit and offset', async () => {
      const devices = await Device.get(50, 10);
      expect(devices.length).toBeLessThanOrEqual(50);
      expect(devices.length).toBe(0)
    });

    it('should return devices in descending order', async () => {
      const devices = await Device.get(100, 0, true);
      expect(devices[0].id).toBeGreaterThan(1)
    });

    it('should return devices filtered by specifications', async () => {
      const specs = { 'Screen Size': '4.5'};
      const devices = await Device.get(100, 0, false, specs);
      expect(devices[0].name).toContain('Apple')
    });
  });
});

describe('User Model', () => {
  describe('Check User Existence', () => {
    it('should throw error if user already exists', async () => {
      const userData = { username: 'existingUser', email: 'u1@test.com' };
      await expect(User.checkIfUserExists(false, userData)).rejects.toThrow('User already exists');
    });

    it('should throw error if user does not exist', async () => {
      const userData = { username: 'nonExistent', email: 'nonexistent@email.com' };
      await expect(User.checkIfUserExists(true, userData)).rejects.toThrow('Invalid username/password');
    });
  });

  describe('User Registration', () => {
    it('should successfully register a new user', async () => {
      const user = await User.register('u4', 'u4@test.com', 'testpassword', 'testpassword');
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('username', 'u4');
    });

    it('should throw error if passwords do not match', async () => {
      await expect(User.register('u5', 'u5@email.com', 'testpassword', 'differentPassword')).rejects.toThrow('Passwords must match!');
    });
  });

  describe('User Login', () => {
    it('should successfully login an existing user with username', async () => {
      const user = await User.login('user1', null, 'testpassword');
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('username', 'user1');
    });

    it('should successfully login an existing user with email', async () => {
      const user = await User.login(null, 'u1@test.com', 'testpassword');
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('username', 'user1');
    });

    it('should successfully login an existing user with username and email', async () => {
      const user = await User.login('user1', 'u1@test.com', 'testpassword');
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('username', 'user1');
    });

    it('should throw error for invalid username/password', async () => {
      await expect(User.login('user1', null, 'wrongPassword')).rejects.toThrow('Invalid username/password');
    });

    it('should throw error for invalid username/password', async () => {
      await expect(User.login('u0', null, 'testpassword')).rejects.toThrow('Invalid username/password');
    });
  });
});

describe('Key Model', () => {
  describe('GET Keys', () => {
    it('should throw error if no user ID is provided', async () => {
      await expect(Key.get()).rejects.toThrow('No user to find keys!');
    });

    it('should throw error if user has no keys', async () => {
      const userId = 3; // Assume this user has no keys
      await expect(Key.get(userId)).rejects.toThrow('User has no keys!');
    });

    it('should return existing keys for a user', async () => {
      const userId = 2; // Assume this user has keys
      const keys = await Key.get(userId);
      expect(keys.id).toBe(2);
    });
  });

  describe('Validate Key', () => {
    it('should throw error if no key is provided', async () => {
      await expect(Key.validate_key()).rejects.toThrow('No key to validate!');
    });

    it('should return false for an invalid key', async () => {
      const key = 'invalidKey';
      const isValid = await Key.validate_key(key);
      expect(isValid).toBe(false);
    });

    it('should return true for a valid key', async () => {
      const key = '0001'; // Assume this key exists
      const isValid = await Key.validate_key(key);
      expect(isValid).toBe(true);
    });
  });

  describe('Create Key', () => {
    it('should throw error if no user ID is provided', async () => {
      await expect(Key.create()).rejects.toThrow('Cannot create key without a user!');
    });

    it('should throw error if user already has a key', async () => {
      const userId = 2; // Assume this user already has a key
      await expect(Key.create(userId)).rejects.toThrow('User already has a key!');
    });

    it('should successfully create a new key for a user', async () => {
      const userId = 3; // Assume this user doesn't have a key
      const newKey = await Key.create(userId);
      expect(newKey).toHaveProperty('api_key');
    });
  });

  describe('Delete Key', () => {
    it('should throw error if user ID or key ID is not provided', async () => {
      await expect(Key.delete()).rejects.toThrow('User ID + Key ID required!');
    });

    it('should successfully delete a key', async () => {
      const userId = 3;
      const keyId = 1; // Assume this key exists for the user
      const result = await Key.delete(userId, keyId);
      expect(result).toHaveProperty('message', 'API Key deleted successfully!');
    });
  });
});

describe('Manufacturer Model', () => {
  describe('GET Manufacturers', () => {
    it('should return manufacturers with default parameters', async () => {
      const manufacturers = await Manufacturer.get();
      expect(manufacturers).toBeInstanceOf(Array);
      expect(manufacturers.length).toBeLessThanOrEqual(100);
    });

    it('should return manufacturers with custom limit and offset', async () => {
      const manufacturers = await Manufacturer.get(50, 10);
      expect(manufacturers.length).toBeLessThanOrEqual(50);
    });

    it('should return manufacturers in descending order', async () => {
      const manufacturers = await Manufacturer.get(100, 0, true);
      expect(manufacturers[0].id).toBeGreaterThan(1);
    });
  });

  describe('GET Manufacturer by ID', () => {
    it('should throw error if no manufacturer ID is provided', async () => {
      await expect(Manufacturer.get_by_id()).rejects.toThrow('Manufacturer ID Required!');
    });

    it('should return manufacturer details by ID', async () => {
      const manufacturer = await Manufacturer.get_by_id(1); // Assume this ID exists
      expect(manufacturer).toHaveProperty('id', 1);
      expect(manufacturer).toHaveProperty('name');
    });
  });
});

describe('Device Model', () => {
  describe('GET Devices', () => {
    it('should return devices with default parameters', async () => {
      const devices = await Device.get();
      expect(devices).toBeInstanceOf(Array);
      expect(devices.length).toBeLessThanOrEqual(100);
    });

    it('should return devices with custom limit and offset', async () => {
      const devices = await Device.get(50, 10);
      expect(devices.length).toBeLessThanOrEqual(50);
    });

    it('should return devices in descending order', async () => {
      const devices = await Device.get(100, 0, true);
      expect(devices[0].id).toBeGreaterThan(1);
    });

    it('should return devices filtered by specifications', async () => {
      const specs = { 'Screen Size': '4.5' };
      const devices = await Device.get(100, 0, false, specs);
      expect(devices[0].name).toContain('Apple');
    });
  });
});