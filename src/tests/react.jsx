require('source-map-support').install();

import { assert } from 'chai';
import {
  Cursor,
} from '../lib';

import React from 'react';
import { shallow } from 'enzyme';
import { compose } from 'react-komposer';

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
      return props.cursor.on('', (old, current) => {
        onData(null, { data: current });
      })
    })(Markup)
    
    var w = shallow(<Container cursor={cursor}/>);
    assert.equal(w.html(), '<div>d</div>');
    cursor.set('a.b[0].c', 'j');
    assert.equal(w.html(), '<div>j</div>');
  });
}