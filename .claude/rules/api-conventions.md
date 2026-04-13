\---

globs:

&#x20; - 'src/api/\*\*'

&#x20; - 'src/routes/\*\*'

\---



\## API Conventions

\- REST naming: plural nouns, kebab-case

\- Return consistent error format: { error: string, code: number }

\- Validate input with Zod or class-validator

\- Always return appropriate HTTP status codes

