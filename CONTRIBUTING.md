# Contributing guide

**Hello fellow developer/hacker/citizen/peer!**

inspired by : [contributing guide of udata project](https://github.com/opendatateam/udata/blob/master/CONTRIBUTING.md)

... document to finish ...

---------

## Language

The development language is English. All comments and documentation should be written in English, so that we don't end up with “frenghish” methods, and so we can share our learnings with developers around the world.


-----------

## Code guides

### Python style guide

We follow the PEP-0008 and PEP-0257 as mush as possible in the respect of PEP-0020.

On top of that, we apply the [Python Style Guide][py-style-guide] from Google.

#### Python 3 forward compatible syntax

As it's still planned to migrate to Python 3 some day,
try to always use a forward compatible syntax in order
to ensure an easy future migration:

* unicode by default, starts any file with `from __future__ import unicode_literals`
* Python 3 compatible `print` statement with `from __future__ import print_function`
* use `io.open` instead of `codecs.open` to manipulate utf-8 files

### JavaScript style guide

We follow the [JavaScript styleguide][js-styleguide] from airbnb.

### HTML and CSS code guide

We follow @mdo's [code guide][code-guide].

### Documentation syntax

We try to stay as close as possible to [CommonMark][] but use default [extensions proposed by MkDocs][extensions-mkdocs].


[code-ethics]: https://www.w3.org/Consortium/cepc
[simplified-github-workflow]: http://scottchacon.com/2011/08/31/github-flow.html
[PEP-0008]: https://www.python.org/dev/peps/pep-0008/
[PEP-0257]: https://www.python.org/dev/peps/pep-0257/
[PEP-0020]: https://www.python.org/dev/peps/pep-0020/
[py-style-guide]: https://google.github.io/styleguide/pyguide.html
[js-styleguide]: https://github.com/airbnb/javascript
[code-guide]: http://codeguide.co/
[commonmark]: http://commonmark.org/
[extensions-mkdocs]: http://www.mkdocs.org/user-guide/writing-your-docs/
[gitter]: https://gitter.im/opendatateam/udata