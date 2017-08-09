require('source-map-support').install();

import { assert } from 'chai';
import {
  Cursor,
  BundlesQueue as BundlesQueueProto,
  CursorsManager,
  executeBundle,
  executers,
} from '../lib';
import lodash from 'lodash';
import mingo from 'mingo';

import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  compose,
} from 'react-komposer';

class BundlesQueue extends BundlesQueueProto {
  _handler(id, task, done) {
    task();
    done();
  }
}

export default function() {
  it('react compose container', () => {
    class Markup extends React.Component {
      render() {
        return <div>{this.props.cursor.get('a.b[0].c')}</div>;
      }
    }
    
    var cursor = new Cursor(undefined, { a: { b: [{ c: 'd' }, { e: 'f' }] } });
    
    var Container = compose((props, onData) => {
      onData(null, props.cursor.get());
      return props.cursor.on('', (before, after) => {
        onData(null, { data: after });
      })
    })(Markup)
    
    var w = shallow(<Container cursor={cursor}/>);
    assert.equal(w.html(), '<div>d</div>');
    cursor.set('a.b[0].c', 'j');
    assert.equal(w.html(), '<div>j</div>');
  });
}