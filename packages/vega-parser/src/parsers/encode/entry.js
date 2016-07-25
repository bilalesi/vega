import color from './color';
import field from './field';
import scale from './scale';
import signal from './signal';
import property from './property';
import {stringValue} from 'vega-util';

export default function entry(channel, enc, scope, params, fields) {
  var value = (enc.color != null) ? color(enc.color, scope, params, fields)
    : (enc.field != null) ? field(enc.field, fields)
    : (enc.signal != null) ? signal(enc.signal, scope, params)
    : (enc.value != null) ? stringValue(enc.value)
    : null;

  if (enc.scale != null) {
    value = scale(enc, value, scope, params);
  }

  if (enc.mult != null) {
    value += '*' + property(enc.mult, scope, params, fields);
  }

  if (enc.offset != null) {
    value += '+' + property(enc.offset, scope, params, fields);
  }

  return value;
}
