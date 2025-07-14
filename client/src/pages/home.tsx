import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const calorieFormSchema = z.object({
  caloriesIn: z.coerce.number().min(0, "Calories must be 0 or positive"),
  caloriesBurned: z.coerce.number().min(0, "Calories must be 0 or positive").optional(),
  steps: z.coerce.number().min(0, "Steps must be 0 or positive").optional(),
});

type CalorieFormData = z.infer<typeof calorieFormSchema>;

interface CalculationResults {
  totalIn: number;
  totalOut: number;
  exerciseCalories: number;
  stepsCalories: number;
  netCalories: number;
}

export default function Home() {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const form = useForm<CalorieFormData>({
    resolver: zodResolver(calorieFormSchema),
    defaultValues: {
      caloriesIn: undefined,
      caloriesBurned: undefined,
      steps: undefined,
    },
  });

  const onSubmit = (data: CalorieFormData) => {
    // Calculate calories from steps (0.04 calories per step)
    const stepsCalories = data.steps ? Math.round(data.steps * 0.04) : 0;
    
    // Calculate manual exercise calories (default to 0 if not provided)
    const exerciseCalories = data.caloriesBurned || 0;
    
    // Calculate totals
    const totalIn = data.caloriesIn;
    const totalOut = exerciseCalories + stepsCalories;
    const netCalories = totalIn - totalOut;
    
    const calculationResults: CalculationResults = {
      totalIn,
      totalOut,
      exerciseCalories,
      stepsCalories,
      netCalories,
    };
    
    setResults(calculationResults);
    setShowResults(true);
    
    // Smooth scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results-container');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  const getNetCaloriesStyle = () => {
    if (!results) return { borderColor: "border-l-slate-400", textColor: "text-slate-600", bgColor: "text-slate-500" };
    
    if (results.netCalories > 0) {
      return { borderColor: "border-l-red-500", textColor: "text-red-600", bgColor: "text-red-600" };
    } else if (results.netCalories < 0) {
      return { borderColor: "border-l-emerald-500", textColor: "text-emerald-600", bgColor: "text-emerald-600" };
    } else {
      return { borderColor: "border-l-amber-500", textColor: "text-amber-600", bgColor: "text-amber-600" };
    }
  };

  const getNetCaloriesDescription = () => {
    if (!results) return "Enter your data to see results";
    
    if (results.netCalories > 0) {
      return "Caloric surplus - may lead to weight gain";
    } else if (results.netCalories < 0) {
      return "Caloric deficit - may lead to weight loss";
    } else {
      return "Balanced calories - maintenance mode";
    }
  };

  const netStyles = getNetCaloriesStyle();

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Calorie Tracker</h1>
          <p className="text-slate-600">Track your daily caloric intake and burn</p>
        </div>

        {/* Input Form Card */}
        <Card className="rounded-2xl shadow-lg mb-6">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Calories Consumed */}
                <FormField
                  control={form.control}
                  name="caloriesIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700">
                        Calories Consumed
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          min="0"
                          step="1"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Calories Burned (Exercise) */}
                <FormField
                  control={form.control}
                  name="caloriesBurned"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700">
                        Calories Burned (Exercise) 
                        <span className="text-xs text-slate-500 ml-1">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder=""
                          min="0"
                          step="1"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Steps */}
                <FormField
                  control={form.control}
                  name="steps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700">
                        Steps Taken
                        <span className="text-xs text-slate-500 ml-1">(optional, 0.04 cal/step)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder=""
                          min="0"
                          step="1"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Calculate Button */}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 text-lg h-auto"
                >
                  Calculate
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Results Cards */}
        {showResults && results && (
          <div id="results-container" className="space-y-4">
            {/* Total Calories In */}
            <Card className="rounded-2xl shadow-lg border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-700">Total Calories In</h3>
                  <span className="text-2xl font-bold text-slate-800">
                    {results.totalIn.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Total Calories Out */}
            <Card className="rounded-2xl shadow-lg border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-700">Total Calories Out</h3>
                  <span className="text-2xl font-bold text-slate-800">
                    {results.totalOut.toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 text-sm text-slate-500">
                  {results.exerciseCalories > 0 && (
                    <>
                      <span>Exercise: {results.exerciseCalories.toLocaleString()}</span>
                      {results.stepsCalories > 0 && <span className="mx-2">•</span>}
                    </>
                  )}
                  {results.stepsCalories > 0 && (
                    <span>Steps: {results.stepsCalories.toLocaleString()}</span>
                  )}
                  {results.exerciseCalories === 0 && results.stepsCalories === 0 && (
                    <span>No exercise or steps recorded</span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Net Calories */}
            <Card className={`rounded-2xl shadow-lg border-l-4 ${netStyles.borderColor}`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-700">Net Calories</h3>
                  <span className={`text-2xl font-bold ${netStyles.textColor}`}>
                    {results.netCalories.toLocaleString()}
                  </span>
                </div>
                <p className={`mt-2 text-sm ${netStyles.bgColor}`}>
                  {getNetCaloriesDescription()}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>💡 Tip: A caloric deficit leads to weight loss, while a surplus leads to weight gain.</p>
        </div>
      </div>
    </div>
  );
}
