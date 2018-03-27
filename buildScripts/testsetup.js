var register = require('babel-core/register');
register();
require.extensions['.css'] = function() {};
