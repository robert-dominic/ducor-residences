interface StepIndicatorProps {
    steps: string[]
    currentStep: number
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
    return (
        <div className="flex w-full items-start justify-between gap-2 sm:gap-3">
            {steps.map((step, index) => {
                const isCompleted = index < currentStep
                const isActive = index === currentStep

                return (
                    <div key={step} className="flex min-w-0 flex-1 items-start">
                        {/* Circle + Label */}
                        <div className="flex shrink-0 flex-col items-center gap-2">
                            <div className={`
                                flex h-9 w-9 items-center justify-center rounded-full border-2 font-sans text-sm font-medium transition-all duration-300 sm:h-10 sm:w-10
                                ${isCompleted ? "border-accent bg-accent text-white" : ""}
                                ${isActive ? "border-button bg-button text-white" : ""}
                                ${!isCompleted && !isActive ? "border-border bg-surface text-muted" : ""}
                            `}>
                                {isCompleted ? "✓" : index + 1}
                            </div>
                            <span className={`
                                hidden sm:block font-sans text-[11px] uppercase tracking-[0.14em] whitespace-nowrap
                                ${isActive ? "text-primary" : "text-muted"}
                            `}>
                                {step}
                            </span>
                        </div>

                        {/* Connector line */}
                        {index < steps.length - 1 && (
                            <div className={`
                                mt-4 h-[1px] min-w-0 flex-1 transition-all duration-300 sm:mx-3 sm:mt-5
                                ${isCompleted ? "bg-accent" : "bg-border"}
                            `} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
