import 'reflect-metadata'
import { injector, provide } from "phantomdi/dist/injector";
import { ExampleClass } from "phantomdi-lib";
// import ExampleClass from "phantomdi-lib/lib/example";




function Conf(inst: ExampleClass){
  console.log('INVOKED ME', inst)
  return 1
}

const inj = injector([provide(ExampleClass)])

console.log(inj.invoke(null, Conf))