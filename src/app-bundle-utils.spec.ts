import { AppBundleUtils as AClass } from './app-bundle-utils';

const classInstance = new AClass();

describe(classInstance.constructor.name, () => {
  let serverPath;
  let clientPath;
  beforeEach(() => {
    serverPath = 'fixtures/dist/server/ALL_ALL';
    clientPath = 'fixtures/dist/client/ALL_ALL';
  });

  describe('getAppBundle', () => {
    it('should be successful e2e', async () => {
      const bundle = await AClass.getAppBundle(serverPath, clientPath);
      expect(bundle).toBeTruthy();

      expect(typeof bundle.document).toBe('string');
      expect(Array.isArray(bundle.files)).toBeTruthy();
      expect(bundle.files.length).toBeTruthy();
      expect(bundle.hash).toBeTruthy();
      expect(typeof bundle.hash).toBe('string');
    });

    it('should error out', async () => {
      await expect(
        AClass.getAppBundle('asdfasdf', clientPath)
      ).rejects.toBeTruthy();

      await expect(
        AClass.getAppBundle('asdfasdf', 'asdfasdf')
      ).rejects.toBeTruthy();

      await expect(
        AClass.getAppBundle(serverPath, 'asdfasdf')
      ).rejects.toBeTruthy();
    });
  });

  describe('findHash', () => {
    it('should find a hash from main', () => {
      const files = ['main.1234.js', 'styles.dasdfsadf.css', 'favicon.ico'];
      const bundle = AClass.findHash(files);
      expect(bundle).toBeTruthy();
      expect(bundle).toBe('1234');
    });

    it('should find a hash from new name', () => {
      const files = ['main.1234.js', 'styles.dasdfsadf.css', 'favicon.ico'];
      const bundle = AClass.findHash(files, 'styles');
      expect(bundle).toBeTruthy();
      expect(bundle).toBe('dasdfsadf');
    });

    it('should error if no path is present', () => {
      const files = ['main.1234.js', 'styles.dasdfsadf.css', 'favicon.ico'];
      const bundle = () => AClass.findHash(files, 'wtf');
      const bundle2 = () => AClass.findHash([]);
      expect(bundle).toThrowError();
      expect(bundle2).toThrowError();
    });
  });

  describe('readBundleDir', () => {
    it('should log bundle dir', async () => {
      const bundle = await AClass.readBundleDir(serverPath);
      const expected = [
        '3rdpartylicenses.txt',
        'favicon.ico',
        'index.html',
        'main.7c844658e42591e35b52.bundle.js',
        'styles.d41d8cd98f00b204e980.bundle.css',
      ];

      expect(bundle).toBeTruthy();
      expect(bundle).toEqual(expected);
    });

    it('should throw if bundle dir is not found', async () => {
      await expect(AClass.readBundleDir('sldkfjaldkf')).rejects.toBeTruthy();
    });
  });

  describe('readBundleIndex', () => {
    it('should log bundle', async () => {
      const bundle = await AClass.readBundleIndex(serverPath);

      expect(bundle).toBeTruthy();
      expect(bundle).toContain('wow!');
    });

    it('should log error when bundle is not found', async () => {
      await expect(AClass.readBundleIndex('sldkfjaldkf')).rejects.toBeTruthy();
    });
  });
});
