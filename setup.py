from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in erpeaz/__init__.py
from erpeaz import __version__ as version

setup(
	name="erpeaz",
	version=version,
	description="erpeaz",
	author="webeaz",
	author_email="shinilshinu97@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
