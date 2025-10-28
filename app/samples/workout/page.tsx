import { Watermark } from "@/components/samples/watermark"
import { SampleRibbon } from "@/components/samples/sample-ribbon"
import { BlurBlock } from "@/components/samples/blur-block"
import { StickySampleBar } from "@/components/samples/sticky-sample-bar"
import { Button } from "@/components/ui/button"

export const dynamic = "force-static"

export default function WorkoutSample() {
  return (
    <div className="min-h-screen bg-white relative">
      <Watermark />
      <SampleRibbon />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Workout Plan (Preview)</h1>
          <p className="text-xl text-gray-600">
            Progressive strength training • Cardio • Flexibility • All fitness levels
          </p>
        </div>

        {/* Overview */}
        <section className="mb-12 p-8 bg-blue-50 rounded-2xl border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Program Overview</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">4 Days</div>
              <div className="text-gray-600">Per Week</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">45-60min</div>
              <div className="text-gray-600">Per Session</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">12 Weeks</div>
              <div className="text-gray-600">Full Program</div>
            </div>
          </div>
        </section>

        {/* Week Preview - Weeks 1-3 Visible */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Week 1 Preview</h2>

          {/* Day 1 */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Day 1: Upper Body Strength</h3>
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-900 mb-1">Warm-up (10 min)</div>
                <p className="text-gray-700">Light cardio + arm circles + shoulder rolls</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Main Workout</div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Push-ups: 3 sets × 10-12 reps</li>
                  <li>• Dumbbell rows: 3 sets × 12 reps per arm</li>
                  <li>• Shoulder press: 3 sets × 10 reps</li>
                  <li>• Bicep curls: 3 sets × 12 reps</li>
                  <li>• Tricep dips: 3 sets × 10 reps</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Cool-down (5 min)</div>
                <p className="text-gray-700">Upper body stretches + deep breathing</p>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Day 2: Lower Body & Core</h3>
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-900 mb-1">Warm-up (10 min)</div>
                <p className="text-gray-700">Light jog + leg swings + hip circles</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Main Workout</div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Squats: 3 sets × 15 reps</li>
                  <li>• Lunges: 3 sets × 12 reps per leg</li>
                  <li>• Glute bridges: 3 sets × 15 reps</li>
                  <li>• Plank: 3 sets × 30-45 seconds</li>
                  <li>• Russian twists: 3 sets × 20 reps</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Cool-down (5 min)</div>
                <p className="text-gray-700">Lower body stretches + foam rolling</p>
              </div>
            </div>
          </div>

          {/* Day 3 */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Day 3: Cardio & Conditioning</h3>
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-900 mb-1">Warm-up (5 min)</div>
                <p className="text-gray-700">Dynamic stretches + light movement</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Main Workout (30 min)</div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Interval running: 2 min jog, 1 min sprint × 6 rounds</li>
                  <li>• Jump rope: 3 sets × 1 minute</li>
                  <li>• Mountain climbers: 3 sets × 30 seconds</li>
                  <li>• Burpees: 3 sets × 10 reps</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Cool-down (10 min)</div>
                <p className="text-gray-700">Walking + full body stretches</p>
              </div>
            </div>
          </div>

          {/* Day 4 Visible */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Day 4: Full Body Circuit</h3>
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-900 mb-1">Warm-up (10 min)</div>
                <p className="text-gray-700">Full body dynamic warm-up</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Main Workout (3 rounds)</div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Kettlebell swings: 15 reps</li>
                  <li>• Push-ups: 12 reps</li>
                  <li>• Goblet squats: 15 reps</li>
                  <li>• Plank to downward dog: 10 reps</li>
                  <li>• Jump squats: 10 reps</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Cool-down (5 min)</div>
                <p className="text-gray-700">Stretching + mobility work</p>
              </div>
            </div>
          </div>

          {/* Weeks 2-4 Blurred */}
          <BlurBlock blurred>
            <div className="space-y-8">
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Week 2: Progressive Overload</h3>
                <p className="text-gray-700">Increased intensity and volume...</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Week 3: Advanced Techniques</h3>
                <p className="text-gray-700">New exercises and challenges...</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Week 4: Deload & Recovery</h3>
                <p className="text-gray-700">Active recovery and mobility...</p>
              </div>
            </div>
          </BlurBlock>
        </section>

        {/* Progress Tracking */}
        <section className="mb-12 p-8 bg-green-50 rounded-2xl border border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Track Your Progress</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              • <strong>Week 1-4:</strong> Build foundation and proper form
            </p>
            <p>
              • <strong>Week 5-8:</strong> Increase weights and intensity
            </p>
            <p>
              • <strong>Week 9-12:</strong> Peak performance and strength gains
            </p>
            <p>
              • <strong>Measurements:</strong> Track weight, reps, and how you feel
            </p>
          </div>
        </section>

        {/* Get Your Plan Now CTA section */}
        <section className="mb-12">
          <div className="p-8 md:p-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Want to see the full plan?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Get your personalized nutrition plan tailored to your goals.
            </p>
            <a href="/#pricing">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Get Your Plan Now
              </Button>
            </a>
          </div>
        </section>
      </div>

      <StickySampleBar sampleSlug="workout" />
    </div>
  )
}
