'use strict';

require('angular');
require('angular-mocks');

describe('Service: Session', function () {

    var service;

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function (_Session_) {
        service = _Session_;
    }));

    describe('addToVerifiedQualityEdits()', function() {
        it('should add a string to the array of validated Quality Edit IDs', function() {
            service.addToVerifiedQualityEdits('V100');
            expect(service.getVerifiedQualityEditIds()).toContain('V100');
        });

        it('should only add the same string to the array of validated Quality Edit IDs once', function() {
            service.addToVerifiedQualityEdits('V100');
            service.addToVerifiedQualityEdits('V100');
            expect(service.getVerifiedQualityEditIds()).toContain('V100');
            expect(service.getVerifiedQualityEditIds().length).toBe(1);
        });
    });

    describe('addToVerifiedMacroEdits()', function() {
        it('should add a key value pair for edit id and reason to the object of validated Macro Edit IDs', function() {
            service.addToVerifiedMacroEdits('V100', 'reason');
            expect(service.getVerifiedMacroEditIds()).toContain('V100');
        });

        it('should not add a key value pair with an undefined value to the object of validated Macro Edit IDs', function() {
            service.addToVerifiedMacroEdits('V100');
            expect(service.getVerifiedMacroEditIds()).not.toContain('V100');
        });
    });

    describe('removeVerifiedQualityEdit()', function() {
        it('should remove the id from the array of validated Quality Edit IDs', function() {
            service.addToVerifiedQualityEdits('V100');
            expect(service.removeVerifiedQualityEdit('V100')).not.toContain('V100');
        });
    });

    describe('removeVerifiedMacroEdit()', function() {
        it('should remove the id from the array of validated Macro Edit IDs', function() {
            service.addToVerifiedQualityEdits('V100');
            expect(service.removeVerifiedMacroEdit('V100')).not.toContain('V100');
        });
    });

    describe('isVerified()', function() {
        it('should return true if an Edit ID was saved as a Quality Edit ID', function() {
            service.addToVerifiedQualityEdits('V100');
            expect(service.isVerified('V100')).toBeTruthy();
        });

        it('should return true if an Edit ID was saved as a Macro Edit ID', function() {
            service.addToVerifiedMacroEdits('V100', 'test');
            expect(service.isVerified('V100')).toBeTruthy();
        });

        it('should return true if an Edit ID was saved as a Special Edit ID', function() {
            service.addToVerifiedSpecialEdits('V100', [true, true, false]);
            expect(service.isVerified('V100')).toBeTruthy();
        });

        it('should return false if the Edit ID was not found', function() {
            expect(service.isVerified('V999')).toBeFalsy();
        });
    });

    describe('getVerifiedReasonByEditId()', function() {
        it('should return a reason an edit was verified for a macro edit', function() {
            service.addToVerifiedMacroEdits('V100', 'test');
            expect(service.getVerifiedReasonByEditId('V100')).toBe('test');
        });

        it('should return a reason an edit was verified for a special edit', function() {
            service.addToVerifiedSpecialEdits('V100', ['foo', 'bar']);
            expect(service.getVerifiedReasonByEditId('V100')).toEqual(['foo', 'bar']);
        });

        it('should return undefined if an edit has not been verified', function() {
            expect(service.getVerifiedReasonByEditId('V100')).toBeUndefined();
        });
    });

    describe('reset()', function() {
        it('should reset the current session', function() {
            service.reset();
            expect(service.getSession().verifiedQualityEdits).toEqual([]);
            expect(service.getSession().verifiedMacroEdits).toEqual({});
        });
    });
});
