### Angular modules

**adamczak.strings**

Wrap directive (wrapvalue): Wraps value in a prefix or suffix if value isn't empty.

```
<span wrapvalue="phone.areacode" prefix="(" suffix=")"></span>
```

Truncate filter: Truncate a string at a specific length and optionally add a suffix
```
{{value|truncate:maxLength[:suffix]}}
```

Demo: http://adamczak.github.io/angular/demo/

