# TODO

## Instructions

**Human**: Add tasks with ⬜. Update status as work progresses.
**Agent**: Check this file every response. Update status after completing items.

### Status Legend

| Icon | Title   | Meaning     |
| ---- | ------- | ----------- |
| ⬜   | Todo    | Not started |
| 🔄   | Active  | In progress |
| ✅   | Done    | Completed   |
| 🚫   | Blocked | Needs input |

---

## Tasks

- [x] Rename `liqid` package to `liqid-components` in `/liqid-components/package.json`
- [x] Update `liqid-ui` to depend on `liqid-components`
- [x] Refactor imports in `liqid-ui` from `"liqid"` to `"liqid-components"`
- [x] Create new `liqid` package in `/liqid` exporting both libraries
