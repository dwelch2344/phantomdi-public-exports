# Example of lost type info

Simple repro to explore an issue with type information missing from aliased default exports in files.

See observations below


# Steps to reproduce

1) Clone, duh :) 
2) cd `example-lib` 
  - `npm run build`
  - Note that it will run `npm link` to create an alias of `phantomdi-lib`
3) cd `example-app` 
  - `npm link phantomdi-lib` 
  - `npm run build`


Notice the output fails akin to:
```
→ npm run build

> phantomdi-app@1.0.0 build
> ttsc && node lib/example-app.js

/Users/welch/Downloads/phantomdi-lib/example-app/node_modules/phantomdi/dist/injector.js:175
                throw new Error(`No provider for dependency: ${dep.tokens.map(__RΦ.f(t => { var _a; return (_a = t.name) !== null && _a !== void 0 ? _a : t; }, [__RΦ.m("rt:p", [{ n: "t", t: () => __RΦ.a(4), v: null }]), __RΦ.m("rt:f", "F>"), __RΦ.m("rt:t", () => __RΦ.a(1))], "")).join(' | ')}`);
                    
```

# Observations

- If `ExampleClass` is not the default export in `example.ts`, everthing works fine (i.e. `export class ExampleClass{}` works but `export default ExampleClass { }` breaks)
- If you import the class directly `import ExampleClass from "phantomdi-lib/lib/example"` everything works, but not if you import the alias a la `import { ExampleClass } from "phantomdi-lib"` 

# Thoughts 
- I have yet to figure out a better way to test cross-library dependencies, but would love to know a better way than this manual garbage to test libs of libs ;) 
- I know in the past I've had issues between different ts lang targets and classic OOP "inheritence", but not sure that applies here