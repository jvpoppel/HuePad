import { expect } from 'chai';
import {ColorCommand} from "../../../src/data/events/colorCommand";

describe('ColorCommand functionality', () => {

    it('Create command', () => {
        let command: ColorCommand = new ColorCommand(1, [255, 255, 255], true);
        expect(command.light).to.be.equal(1, "Light ID should be 1");
        expect(command.transitionTime).to.be.equal("255", "TransitionTime should be 255");
        command = new ColorCommand(1, [255, 255], true);
        expect(command.transitionTime).to.be.equal("", "TransitionTime should be empty");
    });

    it("Execute a command twice", () => {
        let command: ColorCommand = new ColorCommand(1, [255, 255], true);
        expect(command.execute()).to.be.true("Command should be successfully executed");
        expect(command.execute()).to.be.true("Command should be successfully executed");
    });

    it("Validation on amount of arguments in values", () => {
        expect(new ColorCommand(1, [])).to.be.an('error', "ColorCommand had no values");
        expect(new ColorCommand(1, [1, 2, 3])).to.be.an('error', "ColorCommand had too many values");
    });
})
