import EmitTimestampPlugin from './..';
import assert from 'assert';
/* global describe, it */
/* eslint-disable no-console */

describe('EmitTimestampPlugin', () => {
  describe('Itself', () => {
    it('is a function', () => {
      assert.equal(typeof EmitTimestampPlugin, 'function');
    });
    it('has default options', () => {
      const plugin = new EmitTimestampPlugin();
      assert.ok(plugin.options);
      assert.equal(plugin.options.filename, 'timestamp.json');
    });
  });
  describe('Apply', () => {
    it('is a function', () => {
      assert.equal(typeof EmitTimestampPlugin.apply, 'function');
    });
  });
  describe('_getGitObject', () => {
    describe('with full git object', () => {
      const plugin = new EmitTimestampPlugin({
        git: {
          status: true,
          describe: true,
        },
      });
      it('is a function', () => {
        assert.equal(typeof plugin._getGitObject, 'function');
      });
      const oResult = plugin._getGitObject();
      it('returns an object', () => {
        assert.equal(typeof oResult, 'object');
      });
      console.log('Looks like:', oResult);
    });
    describe('without full git object (!git)', () => {
      const plugin2 = new EmitTimestampPlugin();
      const oResult2 = plugin2._getGitObject();
      it('still returns an object', () => {
        assert.equal(typeof oResult2, 'object');
      });
    });
  });
  describe('_getTimestampObject', () => {
    const plugin = new EmitTimestampPlugin();
    it('is a function', () => {
      assert.equal(typeof plugin._getTimestampObject, 'function');
    });
    const oResult = plugin._getTimestampObject();
    it('returns an object', () => {
      assert.equal(typeof oResult, 'object');
    });
    describe('Result', () => {
      const fnCheckField = (field) => {
        it(`has ${field} field`, () => {
          assert(oResult[ field ]);
        });
      };
      fnCheckField('now');
      fnCheckField('localized');
      fnCheckField('iso');
      fnCheckField('gmt');
      fnCheckField('string');
      it('has reasonable iso field', () => {
        assert(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z/.test(oResult.iso));
      });
    });
    // console.log('Looks like:', oResult);
  });
});
