import { registerSheet } from "react-native-actions-sheet";
import OptionSheet from "./OptionSteet";

registerSheet("option", OptionSheet);
export {};

/**
 * Since we are not importing our Sheets in any component or file, we want to make sure
 * they are bundled by the JS bundler. Hence we will import this file in App.js.
 */
