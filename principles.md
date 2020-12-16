## Architecture
### Domain
- Is pure in the sense that is doesn't directly cause any side effects
- Is directly available to all other layers
- Acts as the "core" of the application, all business logic lives here
- App logic also mostly lives here. Purely presentational logic would live in the UI layer
### UI
- Purely concerned with showing stuff and handling user interactions
- Does not directly cause side effects
- Can directly use `Domain` and can inject `Adapters`
### Ports
- This is where all side effects live, you could call it IO or Repositories etc.
- Nothing can directly access a `Port`, it must be accessed via an `Adapter` (via DI)
- Each port should expose an interface or `contract` that it implements.
- ^ The consumer needs to have confidence that a port does what it says on the tin
### Adapters
- Bridge the gap between `UI` and `Ports`
- Can directly use `Domain` and inject `Ports`
- Should not be doing complex logic, they're more about orchestrating/communicating

## Testing
### Unit Tests
- hooks
  any complex logic should be extracted into a hook and tested in isolation
- Components with any sort of branching/looping behaviour
- Adapters
  all actions/queries should be unit tested thoroughly
- Domain Logic
  selectors, crosscutting concerns
- Ports
### Backstop Tests
- Dumb Components should be tested in isolation
- Anything "smart" should mocked or stubbed
- Animations should be disabled to avoid constant diffing issues
### Integration Tests
- Test on a screen-by-screen basis
- Unlike unit, tests should be written in a user-centric way. "When I type in this field and click Submit I should see x"
- We should include everything from the top level connected component, through dumb components, through adapters, and up to ports
- We could include ports in the test and just stub window.fetch, or we could stub ports. Personally I prefer to stub the ports. The way the port contacts the api is completely separate from the rest of the code. It'd make the tests very brittle, if you decided to change from REST to GraphQL for example, you'd have to rewrite every integration test. If you only test up to the port, as long as the _contract_ remains the same, you don't have to worry about the api implementation.
- ^ This does mean you might want to ensure the ports integrate with the api as expected. But I feel this bleeds into:
### E2E Tests
- Run an actual instance of the app and api and confirm that you can get through the entire application flow (or at least the most common flows)
