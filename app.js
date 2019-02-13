const yargs = require('yargs');
const geo= require('./geocode/geocode');
const argv = yargs
              .options({
                a: {
                  describe: 'Address of the location',
                  string: true,
                  demand: true,
                  alias: 'address'
                }
              })
              .help()
              .alias('help', 'h')
              .argv;

geo.geocode(argv.a);