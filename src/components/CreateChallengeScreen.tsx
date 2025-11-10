import React, { useState } from 'react';
import { ChevronLeft, Sparkles, Heart, Activity, Brain, TrendingUp, Users, Award, Lock, Globe, UserCheck } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface CreateChallengeScreenProps {
  onBack: () => void;
}

export const CreateChallengeScreen: React.FC<CreateChallengeScreenProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalType, setGoalType] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [unit, setUnit] = useState('steps/day');
  const [duration, setDuration] = useState([7]);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [visibility, setVisibility] = useState('public');
  const [moodFilter, setMoodFilter] = useState(false);
  const [maxParticipants, setMaxParticipants] = useState(20);
  const [rewardName, setRewardName] = useState('');

  const steps = [
    { num: 1, label: 'Basics' },
    { num: 2, label: 'Goals & Timeline' },
    { num: 3, label: 'Participation' }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const generateDescription = () => {
    setDescription('Log your daily mindful moments during your commute. Practice breathing exercises and track your progress towards a calmer, more centered you.');
  };

  const goalTypes = [
    { value: 'steps', label: 'Steps Walked', icon: <Activity className="w-4 h-4" /> },
    { value: 'meditation', label: 'Meditation Minutes', icon: <Brain className="w-4 h-4" /> },
    { value: 'mood', label: 'Mood Logs', icon: <Heart className="w-4 h-4" /> },
    { value: 'hrv', label: 'HRV Improvement', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const visibilityOptions = [
    { value: 'public', label: 'Public', icon: <Globe className="w-4 h-4" /> },
    { value: 'friends', label: 'Friends Only', icon: <UserCheck className="w-4 h-4" /> },
    { value: 'private', label: 'Private', icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]" style={{ width: '390px', maxWidth: '390px', margin: '0 auto' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#CCC] px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={handleBack} className="p-2 -ml-2 hover:bg-[#E0E0E0] rounded-lg transition-colors">
          <ChevronLeft className="w-6 h-6 text-[#333]" />
        </button>
        <h1 className="text-[#333]">Create Challenge</h1>
        <button
          onClick={currentStep === 3 ? () => console.log('Create & Share') : handleNext}
          className="text-[#333] hover:bg-[#E0E0E0] px-3 py-2 rounded-lg transition-colors"
        >
          {currentStep === 3 ? 'Create & Share' : 'Next'}
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white border-b border-[#E0E0E0] px-6 py-4 sticky top-[57px] z-10">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <React.Fragment key={step.num}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step.num
                      ? 'border-[#666] bg-[#666] text-white'
                      : 'border-[#CCC] bg-white text-[#999]'
                  }`}
                >
                  {step.num}
                </div>
                <span className={`mt-1 text-xs ${currentStep >= step.num ? 'text-[#333]' : 'text-[#999]'}`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-5 ${currentStep > step.num ? 'bg-[#666]' : 'bg-[#E0E0E0]'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-8">
        {/* Step 1: Basics */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <Label className="text-[#333] mb-2 flex items-center gap-1">
                Challenge Title <span className="text-red-500">*</span>
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Mindful Commute Week"
                className="bg-white border-[#CCC] text-[#333] placeholder:text-[#999]"
              />
            </div>

            <div>
              <Label className="text-[#333] mb-2 flex items-center gap-1">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Log daily steps with breathing breaks..."
                rows={3}
                className="bg-white border-[#CCC] text-[#333] placeholder:text-[#999] resize-none"
              />
              <Button
                onClick={generateDescription}
                variant="outline"
                className="mt-2 border-[#999] text-[#666] hover:bg-[#E0E0E0]"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Description
              </Button>
            </div>

            <div className="border border-[#CCC] rounded-lg p-4 bg-white">
              <p className="text-xs text-[#999] mb-2">FEED PREVIEW</p>
              <div className="border border-[#E0E0E0] rounded-md p-3 bg-[#FAFAFA]">
                <h3 className="text-[#333] mb-1">{title || 'Challenge Title'}</h3>
                <p className="text-sm text-[#666] line-clamp-2">
                  {description || 'Your challenge description will appear here...'}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 text-xs text-[#999]">
                    <Users className="w-3 h-3" />
                    <span>0 joined</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#999]">
                    <Activity className="w-3 h-3" />
                    <span>Not started</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Goals & Timeline */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <Label className="text-[#333] mb-2 flex items-center gap-1">
                Primary Goal Type <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <Select value={goalType} onValueChange={setGoalType}>
                  <SelectTrigger className="flex-1 bg-white border-[#CCC] text-[#333]">
                    <SelectValue placeholder="Select goal type" />
                  </SelectTrigger>
                  <SelectContent>
                    {goalTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          {type.icon}
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-[#333] mb-2">Target Value</Label>
                <Input
                  type="number"
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                  placeholder="10000"
                  className="bg-white border-[#CCC] text-[#333] placeholder:text-[#999]"
                />
              </div>
              <div>
                <Label className="text-[#333] mb-2">Unit</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger className="bg-white border-[#CCC] text-[#333]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="steps/day">steps/day</SelectItem>
                    <SelectItem value="minutes/day">minutes/day</SelectItem>
                    <SelectItem value="logs/day">logs/day</SelectItem>
                    <SelectItem value="% improvement">% improvement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border border-[#E0E0E0] rounded-lg p-4 bg-white">
              <Label className="text-[#333] mb-3 block">Duration (days): {duration[0]}</Label>
              <Slider
                value={duration}
                onValueChange={setDuration}
                min={3}
                max={30}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-[#999] mt-1">
                <span>3 days</span>
                <span>30 days</span>
              </div>
            </div>

            <div>
              <Label className="text-[#333] mb-2">Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-white border-[#CCC] text-[#333]"
              />
            </div>

            <div className="border border-[#CCC] rounded-lg p-4 bg-white">
              <p className="text-xs text-[#999] mb-2">GOAL SUMMARY</p>
              <div className="space-y-2 text-sm text-[#666]">
                <div className="flex justify-between">
                  <span>Goal:</span>
                  <span className="text-[#333]">{goalType || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Target:</span>
                  <span className="text-[#333]">{targetValue || '0'} {unit}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="text-[#333]">{duration[0]} days</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Participation & Enhancements */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <Label className="text-[#333] mb-3 block">Visibility</Label>
              <div className="space-y-2">
                {visibilityOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setVisibility(option.value)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border ${
                      visibility === option.value
                        ? 'border-[#666] bg-[#F0F0F0]'
                        : 'border-[#E0E0E0] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-[#333]">
                      {option.icon}
                      <span>{option.label}</span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        visibility === option.value ? 'border-[#666]' : 'border-[#CCC]'
                      }`}
                    >
                      {visibility === option.value && <div className="w-3 h-3 rounded-full bg-[#666]" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-[#E0E0E0] rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-1">
                <Label className="text-[#333]">Mood Filter</Label>
                <Switch checked={moodFilter} onCheckedChange={setMoodFilter} />
              </div>
              <p className="text-xs text-[#999]">Only show to users with specific mood states (e.g., stressed)</p>
            </div>

            <div>
              <Label className="text-[#333] mb-2 block">Max Participants</Label>
              <div className="flex items-center gap-3 bg-white border border-[#CCC] rounded-lg p-3">
                <button
                  onClick={() => setMaxParticipants(Math.max(5, maxParticipants - 5))}
                  className="w-8 h-8 rounded-md bg-[#E0E0E0] text-[#333] flex items-center justify-center hover:bg-[#D0D0D0]"
                >
                  -
                </button>
                <div className="flex-1 text-center">
                  <span className="text-[#333]">{maxParticipants}</span>
                  <span className="text-xs text-[#999] ml-1">people</span>
                </div>
                <button
                  onClick={() => setMaxParticipants(Math.min(50, maxParticipants + 5))}
                  className="w-8 h-8 rounded-md bg-[#E0E0E0] text-[#333] flex items-center justify-center hover:bg-[#D0D0D0]"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-[#999] mt-1">Range: 5-50 participants</p>
            </div>

            <div>
              <Label className="text-[#333] mb-2">Reward/Badge Name (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  value={rewardName}
                  onChange={(e) => setRewardName(e.target.value)}
                  placeholder="Mindful Warrior"
                  className="flex-1 bg-white border-[#CCC] text-[#333] placeholder:text-[#999]"
                />
                <button className="w-12 h-10 rounded-md border border-[#CCC] bg-white flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#999]" />
                </button>
              </div>
            </div>

            <div className="border-2 border-[#999] rounded-lg p-4 bg-white">
              <p className="text-xs text-[#999] mb-3">CHALLENGE SUMMARY</p>
              <div className="space-y-3">
                <div>
                  <h3 className="text-[#333] mb-1">{title || 'Untitled Challenge'}</h3>
                  <p className="text-sm text-[#666]">{description || 'No description'}</p>
                </div>
                <div className="h-px bg-[#E0E0E0]" />
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-[#999] text-xs">Goal</p>
                    <p className="text-[#333]">{goalType || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-[#999] text-xs">Target</p>
                    <p className="text-[#333]">{targetValue || '0'} {unit}</p>
                  </div>
                  <div>
                    <p className="text-[#999] text-xs">Duration</p>
                    <p className="text-[#333]">{duration[0]} days</p>
                  </div>
                  <div>
                    <p className="text-[#999] text-xs">Max Participants</p>
                    <p className="text-[#333]">{maxParticipants}</p>
                  </div>
                </div>
                <div className="h-px bg-[#E0E0E0]" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#666]">Visibility:</span>
                  <span className="text-[#333] capitalize">{visibility}</span>
                </div>
                {rewardName && (
                  <div className="flex items-center gap-2 text-sm bg-[#F5F5F5] p-2 rounded">
                    <Award className="w-4 h-4 text-[#999]" />
                    <span className="text-[#333]">{rewardName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
