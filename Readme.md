[![Build project](https://github.com/dmitriyVasilievich1986/p3Materials/actions/workflows/build_project.yml/badge.svg?branch=master)](https://github.com/dmitriyVasilievich1986/p3Materials/actions/workflows/build_project.yml)
[![eslint checks](https://github.com/dmitriyVasilievich1986/p3Materials/actions/workflows/eslint_check.yml/badge.svg?branch=master)](https://github.com/dmitriyVasilievich1986/p3Materials/actions/workflows/eslint_check.yml)
[![pre-commit](https://github.com/dmitriyVasilievich1986/p3Materials/actions/workflows/pre_commit.yml/badge.svg?branch=master)](https://github.com/dmitriyVasilievich1986/p3Materials/actions/workflows/pre_commit.yml)

# Persona 3 Reload materials API

The application is designed to store and easily access information about the Persona 3 Reload game.
The application works in the format of a command line and a web server with a frontend client.

## Base usage

#### Build and installation

```sh
git clone git@github.com:dmitriyVasilievich1986/p3Materials.git
cd p3Materials
python -m build
pip install ./dist/p3materials-__current_version__-py3-none-any.whl
```

or just:

```sh
pip install git+https://github.com/dmitriyVasilievich1986/p3Materials.git
```

#### Use CLI

To get all available commands

```sh
p3Materials --help
p3Materials p3m --help
```

Available options:

- `-O` or `--object`: the name of the object for which you want to get information. Choices: [material|shadow|craft]. Default: `shadow`
- `-F` or `--floors`: you can filter the result by specifying floors.
- `-N` or `--names`: you can filter the result by specifying names.

#### Use Web Server

```sh
p3Materials run
```
