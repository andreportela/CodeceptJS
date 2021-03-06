'use strict';
let FileSystem = require('../../../lib/helper/FileSystem');
let should = require('chai').should();
let path = require('path');
let fs;

describe('FileSystem', () => {

  before(() => {
    global.codecept_dir = path.join(__dirname, '/../..');
  });

  beforeEach(() => {
    fs = new FileSystem();
    fs._before();
  });

  it('should be initialized before tests', () => {
    fs.dir.should.eql(global.codecept_dir);
  });

  it('should open dirs', () => {
    fs.amInPath('data');
    fs.dir.should.eql(path.join(global.codecept_dir, '/data'));
  });

  it('should check file contents', () => {
    fs.seeFile('data/fs_sample.txt');
    fs.seeInThisFile('FileSystem');
    fs.dontSeeInThisFile('WebDriverIO');
    fs.dontSeeFileContentsEqual('123345');
    fs.seeFileContentsEqual(
`A simple file
for FileSystem helper
test`);
  });

});
