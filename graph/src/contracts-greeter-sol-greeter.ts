import {
  GreetingReset,
  SetGreetingCall,
} from "../generated/Greeter.sol:Greeter/Greeter_sol_Greeter"
import {
  GreetingResetUser,
  SetGreeting,
} from "../generated/schema"

export function handleGreetingResetEvent(event: GreetingReset): void {
  let entity = new GreetingResetUser(event.params.sender)
  entity.sender = event.params.sender

  entity.save()
}

export function handleSetGreeting(call: SetGreetingCall): void {
  let entity = new SetGreeting(call.transaction.hash)
  entity.sender = call.transaction.from
  entity.greeting = call.inputs._greeting
  entity.save()
}
