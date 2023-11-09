# siri - An iterative irradiation control suite.
<a href="https://github.com/umute97/siri-gui" title="Go to GitHub repo"><img src="https://img.shields.io/static/v1?label=umute97&message=siri-gui&color=green&logo=github" alt="umute97 - siri-gui"></a>
<a href="https://github.com/umute97/siri-gui/releases/"><img src="https://img.shields.io/github/tag/umute97/siri-gui?include_prereleases=&sort=semver&color=green" alt="GitHub tag"></a>
<a href="https://github.com/umute97/siri-gui"><img src="https://img.shields.io/github/stars/umute97/siri-gui?style=social" alt="stars - siri-gui"></a>
<a href="https://github.com/umute97/siri-gui"><img src="https://img.shields.io/github/forks/umute97/siri-gui?style=social" alt="forks - siri-gui"></a>
<a href="https://v3.vuejs.org" title="Go to Vue homepage"><img src="https://img.shields.io/badge/Vue-3-blue?logo=vue.js&logoColor=white" alt="Made with Vue"></a>
<img src="https://img.shields.io/badge/made-with_love-red" alt="maintained - with love">

This is a UI that simplifies controlling the iterative irradiation setup designed and built by Umut Elicabuk.
Originally written for Umut's iterative irradiation studies at HISKP, Bonn.

It features controls for IV, Annealing and Charge Collection measurements as well as a user interface for environmental controlling and monitoring.

## Build
The app is dockerized (see the [Dockerfile](https://github.com/umute97/siri-gui/blob/main/Dockerfile) in the main directory).
It builds the app and serves it with a minimal nginx configuration at port 80.
Simply run:
```bash
docker build -t siri-gui .
```
and start it with
```bash
docker run --rm -d -p 80:80/tcp sirigui:latest
```
