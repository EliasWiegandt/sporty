## Makefile — Sporty Frontend

.PHONY: snap clean-snap

# Take screenshots of the running local dev site into ./screenshots
snap:
	bash scripts/snap_frontend.sh http://127.0.0.1:8787 screenshots

clean-snap:
	rm -rf screenshots
