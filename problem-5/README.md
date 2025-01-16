- Deployment:

  - Install docker and docker compose
  - Change application port if necessary.
  - Start project by docker command: `docker compose up` or `docker compose up -d`(detached mode)

- APIs:

  - getTasks:\
    `curl --location --request GET 'localhost:3000/tasks?status=pending'`.\
    To make it simple: I just implement filter logic with single `status`, it can be easy modified by implementing request query `?status=pending,in-progress,completed` and modify validation logic then modifying mongodb filter with `$or` in repository.

  - getTask:\
    `curl --location --request GET 'localhost:3000/tasks/{id}'`

  - createTask:\
    `curl --location --request POST 'localhost:3000/tasks' --header 'Content-Type: application/json' --data '{ "name": "Task Test", "status": "pending"}'`

  - updateTask:\
    `curl --location --request PUT 'localhost:3000/tasks/{id}' --header 'Content-Type: application/json' --data '{"name": "Task Test Updated Name", "status": "completed"}'`

  - deleteTask:\
    `curl --location --request DELETE 'localhost:3000/tasks/678774b1d8276d151a041acf'`
