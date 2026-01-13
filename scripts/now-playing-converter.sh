#!/bin/bash

# Paths
DJAY_FILE="$HOME/Music/djay/djay Media Library.djayMediaLibrary/NowPlaying.txt"
BUTT_FILE="$HOME/Music/djay/ButtNowPlaying.txt"

# Watch for changes and convert
while true; do
  if [ -f "$DJAY_FILE" ]; then
    TITLE=$(grep "^Title:" "$DJAY_FILE" | sed 's/^Title:[[:space:]]*//')
    ARTIST=$(grep "^Artist:" "$DJAY_FILE" | sed 's/^Artist:[[:space:]]*//')

    if [ -n "$TITLE" ] && [ -n "$ARTIST" ]; then
      echo "$ARTIST - $TITLE" > "$BUTT_FILE"
    fi
  fi
  sleep 2
done
