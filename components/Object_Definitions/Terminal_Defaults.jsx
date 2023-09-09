export const DEFAULT_HOME_DIR = '/home/christopher';
export const DEFAULT_PROMPT_PREFIX = 'christopher@mcgregor:';
export const DEFAULT_PROMPT_ICON = '$';
export const DEFAULT_FILE_STRUCTURE = {
  '': { // root dir -> '/'
    dirs: {
      'home': {
        dirs: {
          'christopher': {
            dirs: {},
            files: [
              ['document1.txt', 'green'],
              ['image1.jpg', 'yellow'],
            ],
          },
          'user1': {
            dirs: {},
            files: [
              ['notes.txt', 'green'],
            ],
          },
        },
        files: [],
      },
      'etc': {
        dirs: {},
        files: [
          ['config.conf', 'purple'],
          ['hosts', 'orange'],
        ],
      },
      'var': {
        dirs: {
          'log': {
            dirs: {},
            files: [
              ['system.log', 'purple'],
            ],
          },
        },
        files: [],
      },
    },
    files: [],
  },
};
