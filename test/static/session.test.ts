import { expect } from 'chai';
import {Session} from "../../src/static/session";

describe('Basic page functionality', () => {

    const session = Session.get();
    it('Set page followed by Get page', () => {
        session.changeToPage(1);
        expect(session.currentPage().getID()).to.be.equal(1, "Page should be 1 after change to page 1");
        session.changeToPage(6);
        expect(session.currentPage().getID()).to.be.equal(6, "Page should be 6 after change to page 6");
    });

    it('Set followed by error on page ID', () => {
        expect(session.changeToPage(0)).to.be.an('error', "Page ID 0 should throw an error as value should be in set {1 .. 6}");
        expect(session.changeToPage(7)).to.be.an('error', "Page ID 7 should throw an error as value should be in set {1 .. 6}");
    });
})
