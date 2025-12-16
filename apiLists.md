# DevTinder APIs

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/interested/userId
- POST /request/send/ignored/userId
- POST request/review/accepted/:requestID
- POST request/review/rejected/:requestID

## userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed - gets you the profile of other users on plateform
