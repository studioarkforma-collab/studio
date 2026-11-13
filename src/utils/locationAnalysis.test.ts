import test from 'node:test';
import assert from 'node:assert/strict';
import { CANDIDATE_SITES, LANDMARK_NODES } from '../data/siteData';
import {
  calculateCatchmentMetrics,
  estimateTravelMinutes,
  filterLandmarks,
  scoreSiteFeasibility
} from './locationAnalysis';

test('filterLandmarks filters by category and search query', () => {
  const transitOnly = filterLandmarks(LANDMARK_NODES, 'transit');
  assert.equal(transitOnly.length, 1);
  assert.equal(transitOnly[0].id, 'metro-station');

  const mallSearch = filterLandmarks(LANDMARK_NODES, 'all', 'lifestyle');
  assert.equal(mallSearch.length, 1);
  assert.equal(mallSearch[0].name, 'Lifestyle Mall');
});

test('estimateTravelMinutes accounts for mode and peak hour congestion', () => {
  const offPeakDrive = estimateTravelMinutes(3.0, 'drive', false);
  const peakDrive = estimateTravelMinutes(3.0, 'drive', true);
  assert.ok(peakDrive > offPeakDrive, 'Peak drive time should exceed off-peak drive time');

  const zeroDist = estimateTravelMinutes(0, 'walk', false);
  assert.equal(zeroDist, 0);

  const walkToMetro = estimateTravelMinutes(1.2, 'walk', false);
  assert.equal(walkToMetro, 15);
});

test('calculateCatchmentMetrics scales population and active landmarks with radius', () => {
  const primary = calculateCatchmentMetrics(3.0, LANDMARK_NODES);
  const secondary = calculateCatchmentMetrics(5.0, LANDMARK_NODES);

  assert.equal(primary.zoneLabel, 'Primary Zone');
  assert.equal(secondary.zoneLabel, 'Secondary Zone');
  assert.ok(secondary.estimatedPopulation > primary.estimatedPopulation);
  assert.equal(primary.activeLandmarksCount, LANDMARK_NODES.length);

  const tight = calculateCatchmentMetrics(0.6, LANDMARK_NODES);
  assert.equal(tight.activeLandmarksCount, 3); // business-site (0), green-belt (0.1), petrol-pump (0.5)
});

test('scoreSiteFeasibility ranks Site A highest given transit and growth advantages', () => {
  const siteA = scoreSiteFeasibility(CANDIDATE_SITES[0]);
  const siteC = scoreSiteFeasibility(CANDIDATE_SITES[2]);

  assert.ok(siteA.totalScore > siteC.totalScore);
  assert.equal(siteA.tier, 'Tier A · Prime');
});
