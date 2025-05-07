#!/usr/bin/env bash
if [ "$#" -eq  "0" ]
  then
    bun  ./scripts/migrate.ts -h
  else
    bun ./scripts/migrate.ts $@ && 
    echo "\nRunning kysely-codegen" && 
    kysely-codegen --camel-case --dialect postgres --out-file ./src/types/db.d.ts
fi