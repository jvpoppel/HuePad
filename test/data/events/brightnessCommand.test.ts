import { expect } from 'chai';
import {BrightnessCommand} from "../../../src/data/events/brightnessCommand";

describe('BrightnessCommand functionality', () => {

    it('Create command', () => {
        let command: BrightnessCommand = new BrightnessCommand(1, [255, 255], true)
        expect(command.light).to.be.equal(1, "Light ID should be 1");
        expect(command.values[0]).to.be.equal(255, "Brightness should be 255");
        expect(command.values[1]).to.be.equal(255, "Transition time should be 255");
    });

    it("Execute a command twice ", () => {
        let command: BrightnessCommand = new BrightnessCommand(1, [255, 255], true);
        expect(command.execute()).to.be.true("Command should be successfully executed");
        expect(command.execute()).to.be.true("Command should be successfully executed");
    });

    it("Validation on amount of arguments in values", () => {
        expect(new BrightnessCommand(1, [])).to.be.an('error', "BrightnessCommand had no values");
        expect(new BrightnessCommand(1, [1, 2, 3])).to.be.an('error', "BrightnessCommand had too many values");
    });
})
