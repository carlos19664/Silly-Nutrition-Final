import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Dumbbell, Target } from "lucide-react"
import Link from "next/link"

export default function WorkoutPage({ params }: { params: { id: string } }) {
  // Demo workout data - in production, fetch from database based on params.id
  const workout = {
    id: params.id,
    name: "Upper Body Strength",
    description: "Build strength and muscle in your chest, back, shoulders, and arms",
    duration: "45 min",
    difficulty: "Intermediate",
    equipment: ["Dumbbells", "Bench", "Pull-up bar"],
    exercises: [
      {
        name: "Bench Press",
        sets: 4,
        reps: "8-10",
        rest: "90 sec",
        notes: "Use a weight that challenges you on the last 2 reps",
      },
      {
        name: "Bent Over Rows",
        sets: 4,
        reps: "10-12",
        rest: "90 sec",
        notes: "Keep your back straight and core engaged",
      },
      {
        name: "Overhead Press",
        sets: 3,
        reps: "8-10",
        rest: "90 sec",
        notes: "Press straight up, avoid arching your back",
      },
      {
        name: "Pull-ups",
        sets: 3,
        reps: "6-8",
        rest: "2 min",
        notes: "Use assistance band if needed",
      },
      {
        name: "Bicep Curls",
        sets: 3,
        reps: "12-15",
        rest: "60 sec",
        notes: "Control the weight on the way down",
      },
      {
        name: "Tricep Dips",
        sets: 3,
        reps: "10-12",
        rest: "60 sec",
        notes: "Keep elbows close to your body",
      },
    ],
    warmup: [
      "5 minutes light cardio (jogging, cycling, or rowing)",
      "Arm circles - 10 forward, 10 backward",
      "Band pull-aparts - 15 reps",
      "Push-ups - 10 reps",
    ],
    cooldown: [
      "Chest stretch - 30 seconds each side",
      "Shoulder stretch - 30 seconds each side",
      "Tricep stretch - 30 seconds each arm",
      "Child's pose - 1 minute",
    ],
  }

  return (
    <div className="min-h-screen bg-[#F1EBDD] p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{workout.difficulty}</Badge>
              {workout.equipment.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-3xl text-[#1E4E78]">{workout.name}</CardTitle>
            <CardDescription className="text-base">{workout.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-8 p-4 bg-[#F1EBDD] rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#1E4E78]" />
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold text-[#1E4E78]">{workout.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#1E4E78]" />
                <div>
                  <p className="text-sm text-gray-600">Difficulty</p>
                  <p className="font-semibold text-[#1E4E78]">{workout.difficulty}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-[#1E4E78]" />
                <div>
                  <p className="text-sm text-gray-600">Exercises</p>
                  <p className="font-semibold text-[#1E4E78]">{workout.exercises.length}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#1E4E78] mb-4">Warm-up (5-10 minutes)</h3>
              <ul className="space-y-2">
                {workout.warmup.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#F4B728] mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#1E4E78] mb-4">Exercises</h3>
              <div className="space-y-4">
                {workout.exercises.map((exercise, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg text-[#1E4E78]">
                            {index + 1}. {exercise.name}
                          </CardTitle>
                          <CardDescription className="mt-1">{exercise.notes}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-6 text-sm">
                        <div>
                          <span className="text-gray-600">Sets: </span>
                          <span className="font-semibold text-[#1E4E78]">{exercise.sets}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Reps: </span>
                          <span className="font-semibold text-[#1E4E78]">{exercise.reps}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Rest: </span>
                          <span className="font-semibold text-[#1E4E78]">{exercise.rest}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1E4E78] mb-4">Cool-down (5 minutes)</h3>
              <ul className="space-y-2">
                {workout.cooldown.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#F4B728] mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
