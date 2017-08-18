import { cliJson1_4 } from '../fixtures/.angular-cli-v1.4';
import { LsAngularApps as AClass } from './ls-angular-apps';

const classInstance = new AClass();

describe(classInstance.constructor.name, () => {
  let MOCK_ANGULAR_JSON;
  beforeEach(() => {
    MOCK_ANGULAR_JSON = cliJson1_4;
  });

  describe('Functions', () => {
    it('should test the presence of all functions', () => {
      expect(
        Object.getOwnPropertyNames(AClass)
          .filter(prop => typeof AClass[prop] === 'function')
          .sort()
      ).toEqual(['getAngularJSON', 'mapAppNames', 'testPath']);
    });
  });

  describe(AClass.mapAppNames.name, () => {
    it('should make an array of values when apps are present', () => {
      expect(AClass.mapAppNames(MOCK_ANGULAR_JSON.apps)).toEqual([
        'wtf',
        'wow',
      ]);
    });
  });

  describe(AClass.testPath.name, () => {
    it('should take test presents of angular-cli.json', async () => {
      const PATH = './.angular-cli.json';
      const angularAppPath = await AClass.testPath();

      expect(angularAppPath).toBeDefined();
      expect(angularAppPath).toBe(PATH);
    });

    it('should throw if angular-cli.json is missing', () => {
      const PATH = './.angular-cli2.json';
      AClass.testPath(PATH).catch(e => {
        expect(e).toBeDefined();
      });
    });
  });

  describe(AClass.getAngularJSON.name, () => {
    it('should get and read cli.json', async () => {
      const angularAppPath = await AClass.getAngularJSON();
      expect(angularAppPath.apps).toBeDefined();
    });

    it('should throw if angular-cli.json is not json', () => {
      const PATH = './.angular-cli.json';

      AClass.getAngularJSON(PATH).catch(e => {
        expect(e).toBeDefined();
      });
    });
  });
});
