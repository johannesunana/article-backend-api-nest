SELECT
  a.id,
  a.title,
  a.description,
  a.body,
  u.username,
  json_agg(t.name) FILTER (
    WHERE
      (t.name IS NOT NULL)
  ) AS tags,
  a."createdAt",
  a."updatedAt"
FROM
  (
    (
      (
        articles a
        JOIN users u ON ((a."authorId" = u.id))
      )
      LEFT JOIN "_articlesTotags" at ON ((a.id = at."A"))
    )
    LEFT JOIN tags t ON ((at."B" = t.id))
  )
GROUP BY
  a.id,
  a.title,
  a.description,
  a.body,
  a."authorId",
  u.username,
  a."createdAt",
  a."updatedAt";