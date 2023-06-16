# siri - An iterative irradiation control suite.
This is a UI that simplifies controlling the iterative irradiation setup designed and built by Umut Elicabuk.
Originally written for Umut's iterative irradiation studies at HISKP, Bonn.

It features controls for IV, Annealing and Charge Collection measurements as well as a user interface for environmental controlling and monitoring.

## Build
The app is dockerized (see the [Dockerfile](https://git.scc.kit.edu/etp-cms-hardware/software/it/hadron/siri-gui/-/blob/main/Dockerfile) in the main directory).
It builds the app and serves it with a minimal nginx configuration at port 80.
Simply run:
```bash
docker build -t siri-gui .
```
and start it with
```bash
docker run --rm -d -p 80:80/tcp sirigui:latest
```
