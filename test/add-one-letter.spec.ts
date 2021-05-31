import { expect } from 'chai';
import { filterToValidWords, letters, possibleNextWords } from '../src/add-one-letter'

describe('add-one-letter', () => {
    describe('possibleNextWords', () => {
        it('finds possible next words', () => {
            expect(possibleNextWords('bar', letters).possibleWords).to.eql([
                'abar', 'bbar', 'cbar', 'dbar', 'ebar', 'fbar', 'gbar',
                'hbar', 'ibar', 'jbar', 'kbar', 'lbar', 'mbar', 'nbar',
                'obar', 'pbar', 'qbar', 'rbar', 'sbar', 'tbar', 'ubar',
                'vbar', 'wbar', 'xbar', 'ybar', 'zbar', 'baar', 'bcar',
                'bdar', 'bear', 'bfar', 'bgar', 'bhar', 'biar', 'bjar',
                'bkar', 'blar', 'bmar', 'bnar', 'boar', 'bpar', 'bqar',
                'brar', 'bsar', 'btar', 'buar', 'bvar', 'bwar', 'bxar',
                'byar', 'bzar', 'babr', 'bacr', 'badr', 'baer', 'bafr',
                'bagr', 'bahr', 'bair', 'bajr', 'bakr', 'balr', 'bamr',
                'banr', 'baor', 'bapr', 'baqr', 'barr', 'basr', 'batr',
                'baur', 'bavr', 'bawr', 'baxr', 'bayr', 'bazr', 'bara',
                'barb', 'barc', 'bard', 'bare', 'barf', 'barg', 'barh',
                'bari', 'barj', 'bark', 'barl', 'barm', 'barn', 'baro',
                'barp', 'barq', 'bars', 'bart', 'baru', 'barv', 'barw',
                'barx', 'bary', 'barz'
            ]);
        })
    })

    describe('filterToValidWords', () => {
        it('filters to valid words', () => {
            expect(filterToValidWords({currentWord: 'something', possibleWords: ['bbb', 'yam', 'turkey']},
            {'yam': 1, 'turkey': 1, 'gravy': 1})).to.eql(['yam', 'turkey']);
        })
    })
})
