<h1 align="center">Transfert Admin Dashboard</h1>



### This is a free admin dashboard ui kit built with:

-   React
-   Tailwind CSS
-   Framer Motion

It is completely responsive and can be used for any type of web application.

### Run this app locally

```shell
npm install
```

```shell
npm run start
```
 public Object login(@RequestBody LoginRequest loginRequest) {
        try {
            String token = userService.authenticate(loginRequest, authenticationManager);
            JwtResponse response = new JwtResponse();
            response.setAccess_token(token);
            String s = response.getAccess_token();
            AppUserResponseClient ueAreponse = new AppUserResponseClient();
            Client uea = userService.getByUsername(loginRequest.getUsername());
            ueAreponse.setToken(s);
            ueAreponse.setData(uea);
            return renderData(true, ueAreponse, "Create ");
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String exceptionAsString = sw.toString();
            return renderStringData(false, "Error while processing", exceptionAsString);
        }
    }