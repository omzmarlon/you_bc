package com.youbc.pooling;

public class StrategyPriority {

    private PoolingStrategy poolingStrategy;
    private Double strategyPriority;

    public StrategyPriority(PoolingStrategy poolingStrategy, Double strategyPriority) {
        this.poolingStrategy = poolingStrategy;
        this.strategyPriority = strategyPriority;
    }

    public PoolingStrategy getPoolingStrategy() {
        return poolingStrategy;
    }

    public Double getStrategyPriority() {
        return strategyPriority;
    }

}
