#!/bin/sh
# zip -r desktop-notify.nw * -x app/ app/**\* .git/**\*
# ignore some repos we aren't using the the demo so we can build faster

zip -r desktop-notify.nw * -x app/bower_components/handlebars.js/**\* app/bower_components/open-sans-fontface/**\*