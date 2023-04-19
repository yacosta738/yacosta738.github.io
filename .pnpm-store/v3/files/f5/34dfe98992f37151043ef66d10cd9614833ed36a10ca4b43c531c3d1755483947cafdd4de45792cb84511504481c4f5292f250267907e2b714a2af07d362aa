import type { Pattern } from "fast-glob";
import type { executions, optionExecutionsPlan, optionPath, Options } from "../options/index.js";
export default class files {
    pipe: (callbacks?: executions) => Promise<optionExecutionsPlan>;
    not: (pattern: Options["exclude"]) => Promise<this>;
    by: (glob?: Pattern | Pattern[]) => Promise<this>;
    in: (path?: optionPath) => Promise<this>;
    plan: optionExecutionsPlan;
    constructor(debug?: optionExecutionsPlan["debug"]);
}
